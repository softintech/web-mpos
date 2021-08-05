import PuyPurTableMock from "./PuyPurTableMock";
import MockUtils from "./../mock.utils";

export default function mockPuyPur(mock) {
  mock.onPost("api/PuyPurs").reply(({ data }) => {
    const { PuyPur } = JSON.parse(data);
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
    } = PuyPur;

    const id = generateUserId();
    const newPuyPur = {
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
    PuyPurTableMock.push(newPuyPur);
    return [200, { PuyPur: newPuyPur }];
  });

  mock.onPost("api/PuyPurs/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdPuyPurs = mockUtils.baseFilter(
      PuyPurTableMock,
      queryParams
    );
    return [200, filterdPuyPurs];
  });

  mock.onPost("api/PuyPurs/deletePuyPurs").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = PuyPurTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        PuyPurTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onPost("api/PuyPurs/updateStatusForPuyPurs").reply(config => {
    const { ids, status } = JSON.parse(config.data);
    PuyPurTableMock.forEach(el => {
      if (ids.findIndex(id => id === el.id) > -1) {
        el.status = status;
      }
    });
    return [200];
  });

  mock.onGet(/api\/PuyPurs\/\d+/).reply(config => {
    const id = config.url.match(/api\/PuyPurs\/(\d+)/)[1];
    const PuyPur = PuyPurTableMock.find(el => el.id === +id);
    if (!PuyPur) {
      return [400];
    }

    return [200, PuyPur];
  });

  mock.onPut(/api\/PuyPurs\/\d+/).reply(config => {
    const id = config.url.match(/api\/PuyPurs\/(\d+)/)[1];
    const { PuyPur } = JSON.parse(config.data);
    const index = PuyPurTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    PuyPurTableMock[index] = { ...PuyPur };
    return [200];
  });

  mock.onDelete(/api\/PuyPurs\/\d+/).reply(config => {
    const id = config.url.match(/api\/PuyPurs\/(\d+)/)[1];
    const index = PuyPurTableMock.findIndex(el => el.id === +id);
    PuyPurTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = PuyPurTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
