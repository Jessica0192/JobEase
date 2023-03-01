from sqlalchemy import Column, Integer, ForeignKey, Table

from db.db_setup import Base

portfolio_resource = Table(
    'portfolio_resource', Base.metadata,
    Column('portfolio_id', Integer, ForeignKey('portfolios.id', ondelete='CASCADE')),
    Column('resource_id', Integer, ForeignKey('resources.id', ondelete='CASCADE'))
)
