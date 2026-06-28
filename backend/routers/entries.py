from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import EntryCreate, EntryUpdate, EntryResponse
import crud

router = APIRouter(prefix="/entries", tags=["entries"])


@router.get("/", response_model=list[EntryResponse])
def list_entries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_entries(db, skip=skip, limit=limit)


@router.get("/{entry_id}", response_model=EntryResponse)
def get_entry(entry_id: int, db: Session = Depends(get_db)):
    entry = crud.get_entry(db, entry_id)
    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry


@router.post("/", response_model=EntryResponse, status_code=201)
def create_entry(entry: EntryCreate, db: Session = Depends(get_db)):
    return crud.create_entry(db, entry)


@router.put("/{entry_id}", response_model=EntryResponse)
def update_entry(entry_id: int, entry: EntryUpdate, db: Session = Depends(get_db)):
    updated = crud.update_entry(db, entry_id, entry)
    if updated is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return updated


@router.delete("/{entry_id}", status_code=204)
def delete_entry(entry_id: int, db: Session = Depends(get_db)):
    if not crud.delete_entry(db, entry_id):
        raise HTTPException(status_code=404, detail="Entry not found")
