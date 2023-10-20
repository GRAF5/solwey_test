class Item < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validate :value_must_be_positive_nonzero

  has_many :orders_description, dependent: :nullify

  
  def value_must_be_positive_nonzero
    if price.blank? || price <= 0
      errors.add(:price, "must be a positive non-zero number")
    end
  end
end
