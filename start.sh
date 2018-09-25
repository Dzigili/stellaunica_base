
BIN=/home/stellaunica/suvenv/bin/python
cd /home/stellaunica/stellaunica/
$BIN stellaunica &
PYTHONPATH=/home/stellaunica/stellaunica:${PYTHONPATH} $BIN src/scripts/stellaunica_mailer.py &

