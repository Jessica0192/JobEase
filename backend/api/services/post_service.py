from sqlalchemy.orm import Session
from sqlalchemy.exc import DataError
from db.models.post_model import Post
from pydantic_schemas import post_schema


def get_all_posts_for_user(db: Session, user_id: int, limit: int = 100):
    return db.query(Post).filter(Post.post_user_id == user_id).limit(limit).all()


def check_by_id_if_post_exists_for_user(db: Session, post_id: int, user_id: int):
    db_post = db.query(Post).filter(Post.id == post_id, Post.post_user_id == user_id).first()
    if db_post:
        return db_post
    else:
        return None


def get_all_posts(db: Session, limit: int = 100):
    return db.query(Post).limit(limit).all()


def create_post(db: Session, post: post_schema.PostCreate, user_id: int):
    try:
        db_post = Post(content=post.content,
                       post_user_id=user_id)

        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    except DataError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new post that has more than 280 characters for content\n"
              "Error Args:" + str(error.args))
        return None


def delete_post_by_id(db: Session, post_id: int):
    existing_post = db.query(Post).filter(Post.id == post_id)
    if not existing_post.first():
        return False
    existing_post = existing_post.first()
    db.delete(existing_post)
    db.commit()
