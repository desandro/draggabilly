# @desandro only
deploy:
	rsync -avz build/ ${BERNA}:~/subdomains/draggabilly.desandro.com/
