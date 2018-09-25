#!/bin/bash

echo 'stop mailer'
ps aux | grep stellaunica_mailer | grep -v grep | awk '{ print "kill -9 "$2 }' | bash
echo 'stop stellaunica'
ps aux | grep stellaunica | grep -v grep | grep python | awk '{ print "kill -9 "$2 }' | bash

