# @desandro only
deploy:
	netlify deploy --dir=build

gulp:
	gulp site

prod: gulp deploy
