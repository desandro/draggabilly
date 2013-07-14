# @desandro only
deploy:
	s3cmd sync build/. s3://draggabilly.desandro.com
