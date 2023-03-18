import fastapi
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from db.db_setup import get_db
from db.models.user_model import User
from pydantic_schemas import post_schema
from api.services import post_service, auth_service

router = fastapi.APIRouter(
    prefix="/post",
    tags=["posts"]
)


@router.get("/{post_id}", response_model=post_schema.Post)
async def retrieve_post_info_by_id(post_id: int,
                                   db: Session = Depends(get_db),
                                   current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_post = post_service.check_by_id_if_post_exists_for_user(db=db,
                                                               post_id=post_id,
                                                               user_id=current_user.id)
    if db_post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if current_user.id != db_post.user_id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    return db_post


@router.get("/", response_model=list[post_schema.Post])
async def retrieve_all_posts_for_user(limit: int = 100,
                                      db: Session = Depends(get_db),
                                      current_user: User = Depends(auth_service.get_current_user_from_token)):
    return post_service.get_all_posts_for_user(db=db, limit=limit, user_id=current_user.id)


@router.get("/all-posts/", response_model=list[post_schema.Post])
async def retrieve_all_posts(limit: int = 100,
                             db: Session = Depends(get_db),
                             current_user: User = Depends(auth_service.get_current_user_from_token)):
    return post_service.get_all_posts(db=db, limit=limit)


@router.post("/", response_model=post_schema.Post)
async def create_new_post(post: post_schema.PostCreate,
                          db: Session = Depends(get_db),
                          current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_post = post_service.create_post(db=db,
                                       post=post,
                                       user_id=current_user.id)
    if db_post is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Content cannot be longer than 280 characters")
    return db_post


@router.put("/{post_id}", response_model=post_schema.Post)
async def update_post_by_id(post_id: int,
                            post: post_schema.PostCreate,
                            db: Session = Depends(get_db),
                            current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_post = post_service.check_by_id_if_post_exists_for_user(db=db,
                                                               post_id=post_id,
                                                               user_id=current_user.id)
    if db_post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if current_user.id != db_post.user_id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")

    db_post = post_service.update_post(db=db, post=post, user_id=current_user.id, post_id=post_id)

    if db_post is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Content cannot be longer than 280 characters")
    return db_post


@router.delete("/{post_id}")
async def delete_post(post_id: int,
                      db: Session = Depends(get_db),
                      current_user: User = Depends(auth_service.get_current_user_from_token)):
    db_post = post_service.check_by_id_if_post_exists_for_user(db=db,
                                                               post_id=post_id,
                                                               user_id=current_user.id)
    if db_post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if current_user.id != db_post.user_id and current_user.is_super_user is False:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are not permitted")
    post_service.delete_post_by_id(db=db, post_id=post_id)
    return {"message": "Successfully deleted"}
