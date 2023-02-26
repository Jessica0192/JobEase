from datetime import datetime
from pydantic import BaseModel
from typing import List
from pydantic_schemas.resource_schema import Resource


class PortfolioBase(BaseModel):
    portfolio_name: str
    # resources: List[Resource]


class PortfolioCreate(PortfolioBase):
    pass


class Portfolio(PortfolioBase):
    id: int
    portfolio_user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
