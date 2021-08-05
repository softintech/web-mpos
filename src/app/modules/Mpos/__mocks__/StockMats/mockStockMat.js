import StockMatTableMock from "./StockMatTableMock";
import MockUtils from "./../mock.utils";

export default function mockStockMat(mock) {
  mock.onPost("api/StockMats").reply(({ data }) => {
    const { StockMat } = JSON.parse(data);
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
    } = StockMat;

    const id = generateUserId();
    const newStockMat = {
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
    StockMatTableMock.push(newStockMat);
    return [200, { StockMat: newStockMat }];
  });

  mock.onPost("api/StockMats/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdStockMats = mockUtils.baseFilter(
      StockMatTableMock,
      queryParams
    );
    return [200, filterdStockMats];
  });

  mock.onPost("api/StockMats/deleteStockMats").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = StockMatTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        StockMatTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/StockMats/updateStatusForStockMats").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    StockMatTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/StockMats\/\d+/).reply(config => {
    const id = config.url.match(/api\/StockMats\/(\d+)/)[1];
    const StockMat = StockMatTableMock.find(el => el.id === +id);
    if (!StockMat) {
      return [400];
    }

    return [200, StockMat];
  });

  mock.onPut(/api\/StockMats\/\d+/).reply(config => {
    const id = config.url.match(/api\/StockMats\/(\d+)/)[1];
    const { StockMat } = JSON.parse(config.data);
    const index = StockMatTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    StockMatTableMock[index] = { ...StockMat };
    return [200];
  });

  mock.onDelete(/api\/StockMats\/\d+/).reply(config => {
    const id = config.url.match(/api\/StockMats\/(\d+)/)[1];
    const index = StockMatTableMock.findIndex(el => el.id === +id);
    StockMatTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = StockMatTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
