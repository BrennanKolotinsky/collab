# README
Follow this guide: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-v7-project-with-a-react-frontend-on-ubuntu-20-04#step-6-creating-the-recipe-controller-and-model

Tech Stack: Ruby on Rails, React, PostgreSQL, TypeScript, Jest and Rspec (mirroring VTS tech stack at past company)

run ```yarn install``` to install necessary packages before continuing

run ```bin/rails db:create``` and ```bin/rails db:migrate RAILS_ENV=development``` to create the database and run the necessary migrations before continuing

run ```bin/dev``` to start server, then visit http://localhost:3000/

run ```npm run check-types``` to check for TypeScript errors

run ```bundle exec rspec spec/.../..._spec.rb``` for backend unit testing

