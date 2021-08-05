import SalePosTableMock from "./SalePosTableMock";
import MockUtils from "./../mock.utils";

export default function mockSalePos(mock) {
  mock.onPost("api/SalePoss").reply(({ data }) => {
    const { SalePos } = JSON.parse(data);
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
    } = SalePos;

    const id = generateUserId();
    const newSalePos = {
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
    SalePosTableMock.push(newSalePos);
    return [200, { SalePos: newSalePos }];
  });

  mock.onPost("api/SalePoss/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdSalePoss = mockUtils.baseFilter(
      SalePosTableMock,
      queryParams
    );
    return [200, filterdSalePoss];
  });

  mock.onPost("api/SalePoss/deleteSalePoss").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = SalePosTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        SalePosTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/SalePoss/updateStatusForSalePoss").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    SalePosTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/SalePoss\/\d+/).reply(config => {
    const id = config.url.match(/api\/SalePoss\/(\d+)/)[1];
    const SalePos = SalePosTableMock.find(el => el.id === +id);
    if (!SalePos) {
      return [400];
    }

    return [200, SalePos];
  });

  mock.onPut(/api\/SalePoss\/\d+/).reply(config => {
    const id = config.url.match(/api\/SalePoss\/(\d+)/)[1];
    const { SalePos } = JSON.parse(config.data);
    const index = SalePosTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    SalePosTableMock[index] = { ...SalePos };
    return [200];
  });

  mock.onDelete(/api\/SalePoss\/\d+/).reply(config => {
    const id = config.url.match(/api\/SalePoss\/(\d+)/)[1];
    const index = SalePosTableMock.findIndex(el => el.id === +id);
    SalePosTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = SalePosTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
