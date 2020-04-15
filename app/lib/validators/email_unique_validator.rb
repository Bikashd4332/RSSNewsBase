module Validators
  ##
  # Validator for checking uniqueness of user
  class EmailUniqueValidator < ActiveModel::Validator

    def validate(record)
      begin
        User.find_by_email! record.email;
        ## if user found with that email throw error
        record.errors.add(:email, "Email is already taken!")
      rescue => exception
      end
    end
  end

end