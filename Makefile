# @desandro only
deploy:
	s3cmd -c ~/.s3cfg-desandro sync build/. s3://draggabilly.desandro.com
