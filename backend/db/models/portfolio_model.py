from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .tables.portfolio_resource_table import portfolio_resource
from ..db_setup import Base
from .mixins import Timestamp


class Portfolio(Base, Timestamp):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_name = Column(String(85), nullable=False)
    portfolio_user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="portfolios")
    job_records = relationship("JobRecord", back_populates="portfolio", cascade="all,delete")
    resources = relationship("Resource", secondary=portfolio_resource, back_populates="portfolios", cascade="all,delete")

    def __init__(self, portfolio_name, portfolio_user_id):
        super(Portfolio, self).__init__()
        self.portfolio_name = portfolio_name
        self.portfolio_user_id = portfolio_user_id
