#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import redis
import json
import requests
from src.config.app_config import get_app_config, app_name
import sendgrid
import datetime
import os
import base.common.orm

MAIL_NOT_SENT = 0
MAIL_ON_SENDING = 1
MAIL_SUCCESSFULLY_SENT = 2
MAIL_SENT_ERROR = 3

cfg = get_app_config()

if __name__ == '__main__':
    r = redis.Redis()

    while True:
        task = r.brpop('altiquantum_worker_mail_queue', 5)
        print("TASK",task)
        if not task:
            continue

        if task[0] == b'altiquantum_worker_mail_queue':
            res = json.loads(task[1].decode('utf-8'))

        sender = res['sender']
        sender_name = res['sender_name']
        receiver = res['receiver']
        receiver_name = res['receiver_name']
        subject = res['subject']
        emsg = res['message']
        # id_msg = res['id']

        try:
            mdata = json.loads(mdata)
        except:
            mdata = {}

        sg = sendgrid.SendGridAPIClient(apikey=cfg['mail']['sendgrid_key'])
        # sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))

        from sendgrid.helpers.mail import *

        from_email = Email("do-not-reply@altiquantum.com", "www.altiquantum.com")
        to_email = Email(receiver, receiver_name)
        subject = subject
        content = Content("text/html", emsg)
        personailization = Personalization()
        # personailization.add_to(Email("igor@digitalcube.rs", "Igor"))
        personailization.add_to(Email("igor.v@digitalcube.rs", "Igor"))
        mail = Mail(from_email, subject, to_email, content)
        mail.add_personalization(personailization)


        m_data = mail.get()
        response = sg.client.mail.send.post(request_body=m_data)

        print("SALJEM NA ", receiver)

        m_id = response.headers.get('X-Message-Id')
        if m_id:
            mdata['message_id'] = m_id

        res_msg = response.body.decode('utf-8')
        n = str(datetime.datetime.now())[:19]

        try:
            mdata['send_result'] = res_msg
            mdata = json.dumps(mdata, ensure_ascii=False)
        except Exception as e:
            print('ERROR PREPARING MESSAGE DATA |{}|{}| FOR DATABASE: {}'.format(mdata, res_msg, e))
            mdata = json.dumps(mdata, ensure_ascii=False)  # just save it like it was before








