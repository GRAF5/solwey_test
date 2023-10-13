class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :firstName, :lastName, :role
end
