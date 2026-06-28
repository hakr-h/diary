from sqlalchemy.orm import Session
from models import Entry
from schemas import EntryCreate, EntryUpdate


def get_entries(db: Session, skip: int = 0, limit: int = 100) -> list[Entry]:
    return db.query(Entry).order_by(Entry.created_at.desc()).offset(skip).limit(limit).all()


def get_entry(db: Session, entry_id: int) -> Entry | None:
    return db.query(Entry).filter(Entry.id == entry_id).first()


def create_entry(db: Session, entry: EntryCreate) -> Entry:
    db_entry = Entry(**entry.model_dump())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry


def update_entry(db: Session, entry_id: int, entry: EntryUpdate) -> Entry | None:
    db_entry = get_entry(db, entry_id)
    if db_entry is None:
        return None
    for field, value in entry.model_dump(exclude_unset=True).items():
        setattr(db_entry, field, value)
    db.commit()
    db.refresh(db_entry)
    return db_entry


def delete_entry(db: Session, entry_id: int) -> bool:
    db_entry = get_entry(db, entry_id)
    if db_entry is None:
        return False
    db.delete(db_entry)
    db.commit()
    return True
