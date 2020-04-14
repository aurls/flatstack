import image1 from '../assets/items/item1.jpg';
import image2 from '../assets/items/item2.jpg';
import image3 from '../assets/items/item3.jpg';

const itemsInCart = [
  {
    id: 1,
    image: image1,
    title: 'The Chelsea Boot',
    description: 'Black',
    count: 1,
    price: 235
  },
  {
    id: 2,
    image: image2,
    title: 'The Twill Snap Backpack',
    description: 'Reverse Denim + Brown Leather',
    count: 1,
    price: 65
  },
  {
    id: 3,
    image: image3,
    title: 'The Twill Zip Tote',
    description: 'Reverse Denim + Brown Leather',
    count: 1,
    price: 48
  }
];

class Server {
  async getItemsInCart () {
    return itemsInCart;
  }
}

export default Server;
