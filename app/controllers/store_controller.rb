class StoreController < ApplicationController
  def index
    @items = Item.all.order(:created_at)
  end



end