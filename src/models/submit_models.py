import datetime
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, DateTime, Text, CHAR, VARCHAR, NUMERIC, Table, DATE
from sqlalchemy.orm import relationship
import base.common.orm
import json



class SubmitEmail(base.common.orm.sql_base):
    __tablename__ = 'submits'

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(64), index=True, nullable=False)
    name = Column(VARCHAR(64))
    message = Column(Text)
    created = Column(DateTime, nullable=False, default=datetime.datetime.now)


    def __init__(self, email, name, message):
        self.email = email
        self.name = name
        self.message = message
