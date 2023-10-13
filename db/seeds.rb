User.create(
  firstName: "Andrii",
  lastName: "Bondarchuk",
  email: "admin@admin.com",
  password: "adminadmin",
  password_confirmation: "adminadmin",
  role: 1
)

# 9.times do |i|
#   User.create(
#     firstName: "User",
#     lastName: "#{i + 1}",
#     email: "user.#{i + 1}@mail.test"
#   )
# end