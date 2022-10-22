import { AxiosResponse } from 'axios';
import React, { Children, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { buyShopItemAPI, getShopItemAPI } from 'src/api/api';
import { BaseProps } from 'src/components/type';
import { RootState } from 'src/store';
import { actionSetShopItems } from 'src/store/reducers/shop';
import { BaseItem, EquipmentItem } from '../Services/Item';
import { v4 } from 'uuid';
import { actionBuyItem } from 'src/store/reducers/character';

interface ShopProps {
  children?: React.ReactNode;
}

interface TableProps extends BaseProps {
  field?: [];
  children?: React.ReactNode;
  data?: [];
}

const Shop: React.FC<ShopProps> = ({ children, ...props }) => {
  const storeC = useSelector((state: RootState) => state.character);
  const storeS = useSelector((state: RootState) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    getShopItemAPI().then((res: AxiosResponse) => {
      dispatch(actionSetShopItems(res.data));
    });
    return () => {};
  }, []);

  const buyItemHandleEvt = (id: number) => {
    // buy item function
    const selectedItem = storeS.items.filter((i: BaseItem) => i.id === id);
    if (storeC.character.money < selectedItem[0].money) {
      console.log('Your money is not enough');
      return;
    }
    buyShopItemAPI(storeC.character.id, id).then((res: AxiosResponse) => {
      dispatch(actionBuyItem(res.data.item));
    });
  };
  // const ItemTable: React.FC<TableProps> = ({ ...props }) => {
  //   return;
  // };

  return (
    <>
      <section className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl text-gray-400 py-3 px-5">SHOP</h1>
        <div className="overflow-x-auto overflow-y-auto">
          <table className="table w-full">
            <thead>
              <tr className=" text-gray-400">
                <th>Name</th>
                <th>Type</th>
                <th>Equipment Type</th>
                <th>Quality</th>
                <th>Attribute</th>
                <th>Value</th>
                <td>Money</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {storeS.items.map((item: EquipmentItem) => {
                return (
                  <tr className=" text-gray-500" key={v4()}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.equipmentType}</td>
                    <td>{item.quality}</td>
                    <td>{item.attribute}</td>
                    <td>{item.value}</td>
                    <td>$ {item.money}</td>
                    <td>
                      <button
                        className="btn px-3 py-1 min-h-fit h-10"
                        onClick={() => buyItemHandleEvt(item.id)}
                      >
                        BUY
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Shop;
