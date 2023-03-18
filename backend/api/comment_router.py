import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from db.models.user_model import User
from pydantic_schemas import comment_schema
from api.services import comment_service, auth_service

router = fastapi.APIRouter(
    prefix="/comment",
    tags=["comments"]
)


@router.get("/", response_model=list[comment_schema.Comment])
async def retrieve_all_comments_user_made(limit: int = 100,
                                          db: Session = Depends(get_db),
                                          current_user: User = Depends(auth_service.get_current_user_from_token)):
    return comment_service.get_all_comments_for_user(db=db, limit=limit, user_id=current_user.id)


@router.get("/{post_id}", response_model=list[comment_schema.Comment])
async def retrieve_all_comments_for_post(post_id: int,
                                         limit: int = 100,
                                         db: Session = Depends(get_db),
                                         current_user: User = Depends(auth_service.get_current_user_from_token)):
    return comment_service.get_all_comments_for_post(db=db, limit=limit, post_id=post_id)


@router.post("/", response_model=comment_schema.Comment)
async def create_new_comment(comment: comment_schema.CommentCreate,
                             db: Session = Depends(get_db),
                             current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_comment = comment_service.create_comment(db=db,
                                                comment=comment,
                                                user_id=current_user.id)
    if db_comment is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Content cannot be longer than 280 characters or Post Id is not valid")
    return db_comment


@router.put("/{comment_id}", response_model=comment_schema.Comment)
async def updated_comment_by_id(comment_id: int,
                                comment: comment_schema.CommentCreate,
                                db: Session = Depends(get_db),
                                current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_comment = comment_service.check_by_id_if_comment_exists_for_user(db=db,
                                                                        comment_id=comment_id,
                                                                        user_id=current_user.id)
    if db_comment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
    if current_user.id != db_comment.user_id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")

    db_comment = comment_service.update_comment(db=db, comment=comment, user_id=current_user.id, comment_id=comment_id)

    if db_comment is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Content cannot be longer than 280 characters or Post Id is not valid")
    return db_comment


@router.delete("/{comment_id}")
async def delete_comment(comment_id: int,
                         db: Session = Depends(get_db),
                         current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_comment = comment_service.check_by_id_if_comment_exists_for_user(db=db,
                                                                        comment_id=comment_id,
                                                                        user_id=current_user.id)
    if db_comment is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
    if current_user.id != db_comment.user_id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    comment_service.delete_comment_by_id(db=db, comment_id=comment_id)
    return {"message": "Successfully deleted"}
