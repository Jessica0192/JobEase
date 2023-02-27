import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from db.models.user_model import User
from pydantic_schemas import portfolio_schema
from api.services import portfolio_service, auth_service

router = fastapi.APIRouter(
    prefix="/portfolio",
    tags=["portfolios"]
)


@router.get("/{portfolio_id}", response_model=portfolio_schema.Portfolio)
async def retrieve_portfolio_info_by_id(portfolio_id: int,
                                        db: Session = Depends(get_db),
                                        current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_portfolio = portfolio_service.check_by_id_if_portfolio_exists_for_user(db=db,
                                                                              portfolio_id=portfolio_id,
                                                                              user_id=current_user.id)
    if db_portfolio is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Portfolio not found")
    if current_user.id != db_portfolio.portfolio_user_id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    return db_portfolio


@router.get("/", response_model=list[portfolio_schema.Portfolio])
async def retrieve_all_portfolios_for_user(limit: int = 100,
                                           db: Session = Depends(get_db),
                                           current_user: User = Depends(auth_service.get_current_user_from_token)):
    return portfolio_service.get_all_portfolios_for_user(db=db, limit=limit, user_id=current_user.id)


@router.get("/all-portfolios/", response_model=list[portfolio_schema.Portfolio])
async def retrieve_all_portfolios(limit: int = 100,
                                  db: Session = Depends(get_db),
                                  current_user: User = Depends(auth_service.get_current_user_from_token)):
    if current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    return portfolio_service.get_all_portfolios(db=db, limit=limit)


@router.post("/", response_model=portfolio_schema.Portfolio)
async def create_new_portfolio(portfolio: portfolio_schema.PortfolioCreate,
                               db: Session = Depends(get_db),
                               current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_portfolio = portfolio_service.create_portfolio(db=db,
                                                      portfolio=portfolio,
                                                      user_id=current_user.id)
    if db_portfolio is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Portfolio already exists")
    return db_portfolio


@router.delete("/{portfolio_id}")
async def delete_portfolio(portfolio_id: int,
                           db: Session = Depends(get_db),
                           current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_portfolio = portfolio_service.check_by_id_if_portfolio_exists_for_user(db=db,
                                                                              portfolio_id=portfolio_id,
                                                                              user_id=current_user.id)
    if db_portfolio is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Portfolio not found")
    if current_user.id != db_portfolio.portfolio_user_id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    portfolio_service.delete_portfolio_by_id(db=db, portfolio_id=portfolio_id)
    return {"message": "Successfully deleted"}
