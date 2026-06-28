from datetime import datetime
from pydantic import BaseModel, Field


class EntryCreate(BaseModel):
    """Shape of data the client sends when creating an entry."""
    title: str | None = None
    content: str = Field(..., min_length=1)
    mood: int = Field(..., ge=1, le=5)


class EntryUpdate(BaseModel):
    """All fields optional — client sends only what changed."""
    title: str | None = None
    content: str | None = Field(default=None, min_length=1)
    mood: int | None = Field(default=None, ge=1, le=5)


class EntryResponse(BaseModel):
    """Shape of data returned to the client."""
    id: int
    title: str | None
    content: str
    mood: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
