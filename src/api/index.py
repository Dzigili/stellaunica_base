# coding= utf-8

from base.application.components import Base
from base.application.components import api
from base.application.components import params
from base.application.components import authenticated

import datetime
import decimal
import json


@api(
    URI='/',
    PREFIX=False
)
class Index(Base):
    @params(  # if you want to add params
        {'name': 'from', 'type': int, 'doc': 'dummy int', 'required': False},
        {'name': 'to', 'type': int, 'doc': 'dummy int', 'required': False},
        )
    def get(self, _from, _to):
        with open('src/api/stanovi.json') as f:
            stanovi = json.load(f)

        if not _from:
            _from=0
        if not _to:
            _to=6
    
        self.render('index.html', stanovi=stanovi[_from:_to])
