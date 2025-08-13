EXT = org
SRC = $(PWD)
SHELL := bash
.PHONY: clean all

clean:
	rm -rf public

all:
	mkdir -p public
	@find "$(SRC)" -type f | while read -r file; do \
		if [[ "$$file" == "$(SRC)/static/"* ]]; then \
			continue; \
		elif [ "$${file##*.}" = "$(EXT)" ]; then \
			emacs --batch --eval "(require 'org)" "$$file" --funcall org-html-export-to-html; \
			file="$${file%.org}.html"; \
			rel="$${file#$(SRC)/}"; \
			mkdir -p "public/$$(dirname "$$rel")"; \
			mv "$$file" public/"$$rel"; \
		else \
			rel="$${file#$(SRC)/}"; \
			mkdir -p "public/$$(dirname "$$rel")"; \
			cp "$$file" public/"$$rel"; \
		fi; \
	done
	cp -r static/* public

demo: all
	python -m http.server -d public/ -b 127.0.0.1 8080
