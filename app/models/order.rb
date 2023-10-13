class Order < ApplicationRecord
  belongs_to :user
  has_many :orders_description
end
