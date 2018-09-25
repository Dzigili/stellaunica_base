## DEPLOYMENT COMMAND - it is in the alias

	rsync -pavte "ssh -i ~/.ssh/id_rsa" --exclude '.git*' --exclude '.idea*' --exclude '*__pycache__*' /home/igor/work/su_work/stellaunica_base/ stellaunica@206.189.103.120:/home/stellaunica/stellaunica/ --delete 

