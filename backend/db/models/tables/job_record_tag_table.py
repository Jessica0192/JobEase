from sqlalchemy import Column, Integer, ForeignKey, Table

from db.db_setup import Base

job_record_tag = Table(
    'job_record_tag', Base.metadata,
    Column('job_record_id', Integer, ForeignKey('job_record.id', ondelete='CASCADE')),
    Column('job_tag_id', Integer, ForeignKey('job_tag.id', ondelete='CASCADE'))
)
