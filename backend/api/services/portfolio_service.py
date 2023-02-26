from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from db.models.portfolio_model import Portfolio
from db.models.resource_model import Resource
from db.models.tables.portfolio_resource_table import portfolio_resource
from pydantic_schemas import portfolio_schema


def get_all_portfolios_for_user(db: Session, user_id: int, limit: int = 100):
    return db.query(Portfolio).filter(Portfolio.portfolio_user_id == user_id).limit(limit).all()


def get_all_portfolios(db: Session, limit: int = 100):
    return db.query(Portfolio).limit(limit).all()


def check_by_id_if_portfolio_exists_for_user(db: Session, portfolio_id: int, user_id: int):
    db_resource = db.query(Portfolio).filter(Portfolio.id == portfolio_id,
                                             Portfolio.portfolio_user_id == user_id).first()
    if db_resource:
        return db_resource
    else:
        return None


def check_by_name_if_portfolio_exists_for_user(db: Session, portfolio_name: str, user_id: int):
    db_resource = db.query(Portfolio).filter(Portfolio.portfolio_name == portfolio_name,
                                             Portfolio.portfolio_user_id == user_id).first()
    if db_resource:
        return db_resource
    else:
        return None


def create_portfolio(db: Session, portfolio: portfolio_schema.PortfolioCreate, user_id: int):
    try:
        existing_portfolio = check_by_name_if_portfolio_exists_for_user(db=db,
                                                                        portfolio_name=portfolio.portfolio_name,
                                                                        user_id=user_id)

        if existing_portfolio is not None:
            return None
        db_portfolio = Portfolio(portfolio_name=portfolio.portfolio_name,
                                 portfolio_user_id=user_id)

        # Append each resource to the portfolio
        for resource_id in portfolio.resource_ids:
            resource = db.query(Resource).filter(Resource.id == resource_id,
                                                 Resource.resource_user_id == user_id).first()
            if not resource:
                # TODO: how to handle error that Resource is not found
                print("\nResource not found with the ID:", resource_id)
                return None
            db_portfolio.resources.append(resource)

        db.add(db_portfolio)
        db.commit()
        db.refresh(db_portfolio)
        return db_portfolio
    except IntegrityError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new portfolio with duplicate portfolio name\n"
              "Error Args:" + str(error.args))
        return None


def delete_portfolio_by_id(db: Session, portfolio_id: int):
    # TODO: YOU HAVE TO DELETE CORRESPONDING DATA FROM portfolio_resource TABLE FIRST IN ORDER TO DELETE THE PORTFOLIO
    existing_portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id)
    if not existing_portfolio.first():
        return False
    existing_portfolio.delete()
    db.commit()
