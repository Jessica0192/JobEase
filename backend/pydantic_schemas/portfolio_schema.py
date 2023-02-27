from datetime import datetime
from pydantic import BaseModel, conlist
from typing import List
from pydantic_schemas.resource_schema import Resource


class PortfolioBase(BaseModel):
    portfolio_name: str


class PortfolioCreate(PortfolioBase):
    resource_ids: conlist(int, min_items=1)


class Portfolio(PortfolioBase):
    id: int
    portfolio_user_id: int
    resources: List[Resource]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
