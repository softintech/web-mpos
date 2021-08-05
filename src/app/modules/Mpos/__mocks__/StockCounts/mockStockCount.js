import StockCountTableMock from "./StockCountTableMock";
import MockUtils from "./../mock.utils";

export default function mockStockCount(mock) {
  mock.onPost("api/StockCounts").reply(({ data }) => {
    const { StockCount } = JSON.parse(data);
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
    } = StockCount;

    const id = generateUserId();
    const newStockCount = {
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
    StockCountTableMock.push(newStockCount);
    return [200, { StockCount: newStockCount }];
  });

  mock.onPost("api/StockCounts/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdStockCounts = mockUtils.baseFilter(
      StockCountTableMock,
      queryParams
    );
    return [200, filterdStockCounts];
  });

  mock.onPost("api/StockCounts/deleteStockCounts").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = StockCountTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        StockCountTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/StockCounts/updateStatusForStockCounts").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    StockCountTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/StockCounts\/\d+/).reply(config => {
    const id = config.url.match(/api\/StockCounts\/(\d+)/)[1];
    const StockCount = StockCountTableMock.find(el => el.id === +id);
    if (!StockCount) {
      return [400];
    }

    return [200, StockCount];
  });

  mock.onPut(/api\/StockCounts\/\d+/).reply(config => {
    const id = config.url.match(/api\/StockCounts\/(\d+)/)[1];
    const { StockCount } = JSON.parse(config.data);
    const index = StockCountTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    StockCountTableMock[index] = { ...StockCount };
    return [200];
  });

  mock.onDelete(/api\/StockCounts\/\d+/).reply(config => {
    const id = config.url.match(/api\/StockCounts\/(\d+)/)[1];
    const index = StockCountTableMock.findIndex(el => el.id === +id);
    StockCountTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = StockCountTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
