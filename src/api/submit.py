# coding= utf-8

from base.application.components import Base
from base.application.components import api
from base.application.components import params
from base.common.sequencer import sequencer
from base.application.components import authenticated

import datetime
import decimal
import json
import base.common.orm
from src.models.submit_models import SubmitEmail

# @authenticated()  # if every http method has to be authenticated
@api(
    URI='/submit',
    # SPECIFICATION_PATH='hello', # optional path for specification list
    # PREFIX=False, # if missing or True uri will be /_prefix_/hello
)
class Submit(Base):
    # @authenticated()  # if get method has to be authenticated
    @params(  # if you want to add params
        {'name': 'email', 'type': 'e-mail', 'doc': 'dummy e-mail'},
        {'name': 'name', 'type': str, 'doc': 'object to be written into ', 'required': True},
        {'name': 'message', 'type': str, 'doc': 'object to be written into', 'required': True},
    )
    def post(self, email, name, message):
        """Submit - put"""
        session = base.common.orm.orm.session()

        s = SubmitEmail(email, name, message)
        print("SASASASA", s)

        # #######################################

        from base.application.api_hooks.api_hooks import save_hash, save_mail_queue

        _message = '''
            <html>
            <body>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr style="background-color: #000000;">
                        <td style="padding: 40px 0 30px 10px;">
                            <img src="http://dodaj.rs/images/Stella_unica_logo.png" style="display: block;"/>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 25px 25px 25px 25px; font-size: 11pt" ;>
                            <h3 style="font-family: Calibri, Helvetica, Arial, sans-serif!important;"> Message from customer.</h3>
                            <br/>
                            <br/>
                            <span style="font-family: Calibri, Helvetica, Arial, sans-serif!important;"><b>Name:</b> __NAME__</span>
                            <br/>
                            <br/>
                            <span style="font-family: Calibri, Helvetica, Arial, sans-serif!important;"><b>Email:</b> __EMAIL__ </span>
                            <br/>
                            <br/>
                            <span style="font-family: Calibri, Helvetica, Arial, sans-serif!important;"><b>Message:</b><br/><br/>" __MESSAGE__ "</span>
                        </td>
                    </tr>
                </table>
            </body>
            </html>

            '''

        from src.config.app_config import get_app_config, app_name
        from src.config.app_config import email_subject
        from src.config.app_config import address_for_email

        cfg = get_app_config()
        mail_cfg = cfg['mail']
        _message = _message.replace('__NAME__', name)
        _message = _message.replace('__EMAIL__', email)
        _message = _message.replace('__MESSAGE__', message)


        m_id = save_mail_queue(mail_cfg['sender'], mail_cfg['sender_name'], address_for_email, app_name,
                               email_subject,
                               _message,
                               "{}")

        r_data = {
            'id': m_id,
            'sender': mail_cfg['sender'],
            'sender_name': mail_cfg['sender_name'],
            'receiver': address_for_email,
            'receiver_name': app_name,
            'subject': email_subject,
            'message': _message
        }

        import redis

        rdb = redis.Redis()
        rdb.lpush('stellaunica_worker_mail_queue', json.dumps(
            r_data
        ))



        # #######################################

        try:
            session.add(s)
            session.commit()
            return self.ok({'message': "OK", 'clieSunt': {'id': s.id, 'email': s.email, 'name': s.name, 'message': s.message, 'created': str(s.created) }})

        except Exception as e:
            session.rollback()
            return self.error('{}'.format(e))


