run:
	go run .

dev:
	reflex -r '\.[go|html|css|js]' -s -- sh -c 'make run'

format:
	go fmt .