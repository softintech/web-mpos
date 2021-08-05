import PuyMatTableMock from "./PuyMatTableMock";
import MockUtils from "./../mock.utils";

export default function mockPuyMat(mock) {
  mock.onPost("api/PuyMats").reply(({ data }) => {
    const { PuyMat } = JSON.parse(data);
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
    } = PuyMat;

    const id = generateUserId();
    const newPuyMat = {
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
    PuyMatTableMock.push(newPuyMat);
    return [200, { PuyMat: newPuyMat }];
  });

  mock.onPost("api/PuyMats/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdPuyMats = mockUtils.baseFilter(
      PuyMatTableMock,
      queryParams
    );
    return [200, filterdPuyMats];
  });

  mock.onPost("api/PuyMats/deletePuyMats").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = PuyMatTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        PuyMatTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/PuyMats/updateStatusForPuyMats").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    PuyMatTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/PuyMats\/\d+/).reply(config => {
    const id = config.url.match(/api\/PuyMats\/(\d+)/)[1];
    const PuyMat = PuyMatTableMock.find(el => el.id === +id);
    if (!PuyMat) {
      return [400];
    }

    return [200, PuyMat];
  });

  mock.onPut(/api\/PuyMats\/\d+/).reply(config => {
    const id = config.url.match(/api\/PuyMats\/(\d+)/)[1];
    const { PuyMat } = JSON.parse(config.data);
    const index = PuyMatTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    PuyMatTableMock[index] = { ...PuyMat };
    return [200];
  });

  mock.onDelete(/api\/PuyMats\/\d+/).reply(config => {
    const id = config.url.match(/api\/PuyMats\/(\d+)/)[1];
    const index = PuyMatTableMock.findIndex(el => el.id === +id);
    PuyMatTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = PuyMatTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
