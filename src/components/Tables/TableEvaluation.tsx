import { Product } from '../../types/product';
import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';
import LogoIcon from '../../images/user/user-01.png';

const TableEvaluation: Product[] = [
  {
    image: ProductOne,
    name: 'Groupe A ',
    category: 'PROJET 5',
    price: 296,
    sold: 22,
    profit: 0
  },
  {
    image: ProductTwo,
    name: 'Groupe B',
    category: 'PROJET 1',
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: ProductThree,
    name: 'Groupe C',
    category: 'PROJET 2',
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: ProductFour,
    name: 'Groupe D',
    category: 'PROJET 3',
    price: 499,
    sold: 72,
    profit: 103,
  },
];

const TableTwo = () => {
  return (
    
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white"> Evaluation des tâches par projet
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">EQUIPES</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">PROJETS</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">TACHES</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium"> </p>
        </div>

      </div>

      {TableEvaluation.map((product, key) => (

    
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" key={key}>

          <div className="col-span-3 flex items-center">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center space-x-8">

                  <div className="h-12.5 w-15 rounded-md">
                      <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
                          <div className="flex -space-x-2">
                              <button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark">
                                  <img src={LogoIcon} alt="User"/>
                              </button>
                              <button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark">
                                  <img src={LogoIcon} alt="User"/>
                              </button>
                              <button className="h-9 w-9 rounded-full border-2 border-white dark:border-boxdark">
                                  <img src={LogoIcon} alt="User"/>
                              </button>
                          </div>
                      </div>
                  </div>

                  <p className="text-sm text-black dark:text-white">{product.name}</p>
              </div>

          </div>


          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.sold}  sur {product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default TableTwo;
