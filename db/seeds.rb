User.create(
  firstName: "Admin",
  lastName: "1",
  email: "admin@admin.com",
  password: "adminadmin",
  password_confirmation: "adminadmin",
  role: 1
)

9.times do |i|
  User.create(
    firstName: "User",
    lastName: "#{i + 1}",
    email: "user.#{i + 1}@mail.test",
    password: "testtest",
    password_confirmation: "testtest"
  )
end

10.times do |i|
  Item.create(
    name: "Item #{i + 1}",
    description: "Lorem ipsum dolor sit amet",
    price: rand(11.2...76.9).round(2)
  )
end