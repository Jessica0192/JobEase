from sqlalchemy.orm import Session
from sqlalchemy.exc import DataError
from db.models.comment_model import Comment
from pydantic_schemas import comment_schema
from db.models.post_model import Post


def get_all_comments_for_user(db: Session, user_id: int, limit: int = 100):
    return db.query(Comment).filter(Comment.user_id == user_id).limit(limit).all()


def check_by_id_if_comment_exists_for_user(db: Session, comment_id: int, user_id: int):
    db_post = db.query(Comment).filter(Comment.id == comment_id, Comment.user_id == user_id).first()
    if db_post:
        return db_post
    else:
        return None


def get_all_comments_for_post(db: Session, post_id: int, limit: int = 100):
    return db.query(Comment).filter(Comment.post_id == post_id).limit(limit).all()


def create_comment(db: Session, comment: comment_schema.CommentCreate, user_id: int):
    try:
        db_post = db.query(Post).filter(Post.id == comment.post_id).first()

        if not db_post:
            print("\nPost not found with the ID:", comment.post_id)
            return None
        db_comment = Comment(content=comment.content,
                             user_id=user_id,
                             post_id=comment.post_id)

        db.add(db_comment)
        db.commit()
        db.refresh(db_comment)
        return db_comment
    except DataError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new comment that has more than 280 characters for content\n"
              "Error Args:" + str(error.args))
        return None


def update_comment(db: Session, comment: comment_schema.CommentCreate, user_id: int, comment_id: int):
    try:
        db_post = db.query(Post).filter(Post.id == comment.post_id).first()

        if not db_post:
            print("\nPost not found with the ID:", comment.post_id)
            return None

        db_comment = check_by_id_if_comment_exists_for_user(db=db, comment_id=comment_id, user_id=user_id)

        if db_comment:
            if db_post.id != db_comment.post_id:
                print("\nComment doesn't belong to the provided post ID:", comment.post_id)
                return None

            db_comment.content = comment.content
            db.commit()
            db.refresh(db_comment)
            return db_comment
        else:
            return None
    except DataError as error:
        # Handle the exception gracefully and log for being informative
        print("\nHandled Exception: Trying to create a new comment that has more than 280 characters for content\n"
              "Error Args:" + str(error.args))
        return None


def delete_comment_by_id(db: Session, comment_id: int):
    existing_comment = db.query(Comment).filter(Comment.id == comment_id)
    if not existing_comment.first():
        return False
    existing_comment = existing_comment.first()
    db.delete(existing_comment)
    db.commit()
