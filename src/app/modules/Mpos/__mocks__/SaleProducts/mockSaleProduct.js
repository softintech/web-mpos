import SaleProductTableMock from "./SaleProductTableMock";
import MockUtils from "./../mock.utils";

export default function mockSaleProduct(mock) {
  mock.onPost("api/SaleProducts").reply(({ data }) => {
    const { SaleProduct } = JSON.parse(data);
    const {
      firstName = "",
      lastName = "",
      email = "",
      userName = "",
      gender = "Female",
      status = 0,
      dateOfBbirth = "01/01/2019",
      ipAddress = "127.0.0.1",
      type = 1
    } = SaleProduct;

    const id = generateUserId();
    const newSaleProduct = {
      id,
      firstName,
      lastName,
      email,
      userName,
      gender,
      status,
      dateOfBbirth,
      ipAddress,
      type
    };
    SaleProductTableMock.push(newSaleProduct);
    return [200, { SaleProduct: newSaleProduct }];
  });

  mock.onPost("api/SaleProducts/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdSaleProducts = mockUtils.baseFilter(
      SaleProductTableMock,
      queryParams
    );
    return [200, filterdSaleProducts];
  });

  mock.onPost("api/SaleProducts/deleteSaleProducts").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = SaleProductTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        SaleProductTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/SaleProducts/updateStatusForSaleProducts").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    SaleProductTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/SaleProducts\/\d+/).reply(config => {
    const id = config.url.match(/api\/SaleProducts\/(\d+)/)[1];
    const SaleProduct = SaleProductTableMock.find(el => el.id === +id);
    if (!SaleProduct) {
      return [400];
    }

    return [200, SaleProduct];
  });

  mock.onPut(/api\/SaleProducts\/\d+/).reply(config => {
    const id = config.url.match(/api\/SaleProducts\/(\d+)/)[1];
    const { SaleProduct } = JSON.parse(config.data);
    const index = SaleProductTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    SaleProductTableMock[index] = { ...SaleProduct };
    return [200];
  });

  mock.onDelete(/api\/SaleProducts\/\d+/).reply(config => {
    const id = config.url.match(/api\/SaleProducts\/(\d+)/)[1];
    const index = SaleProductTableMock.findIndex(el => el.id === +id);
    SaleProductTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = SaleProductTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
