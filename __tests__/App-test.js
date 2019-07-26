/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import AButton from '../App/AButton'
import LogItem from '../App/LogItem'
import Logs from '../App/Logs'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
jest.mock('@fortawesome/react-native-fontawesome', () => 'FontAwesomeIcon');
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// it('renders correctly', () => {
//   renderer.create(<App />);
// });


//sample data entries and test it
let data = {"2019-07-07":{"value":"5","note":"note"},"2019-07-09":{"value":"9","note":"not a note"}}

test('entry values', () => {
  expect(data["2019-07-07"].value).toBe("5");
});
test('entry note', () => {
  expect(data["2019-07-09"].note).toBe("not a note");
});

//sample log and test it
let log = {"label":"patience","values":data,"color":"#fff"}

test('log entry values', () => {
  expect(log.values["2019-07-07"].value).toBe("5");
});
test('log color', () => {
  expect(log.color).toBe("#fff");
});

let newLog = Logs.newLog('sampleLog');
test('log color', () => {
  expect(newLog.label).toBe("sampleLog");
});


let ledger = {
  "name":"birthdays",
  logs: [
    log
  ]
}

test('ledger entry values', () => {
  expect(ledger.name).toBe("birthdays");
});

it('abutton renders correctly', () => {
  const tree = renderer.create(
    <AButton />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});

// it('renders correctly', () => {
//   const tree = renderer.create(
//     <LogItem 
//     	log={log}
//     	setColor={null}
//         setDate={null}
//         prettyDate="2019-07-07"
//         saveLogData={null}
//         deleteLog={null}
//         key={1}
//         index={1}/>
//     ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('renders correctly', () => {
//   const tree = renderer.create(
//     <AButton />
//     ).toJSON();
//   expect(tree).toMatchSnapshot();
// });
// it('renders correctly', () => {
//   const tree = renderer.create(
//     <AButton />
//     ).toJSON();
//   expect(tree).toMatchSnapshot();
// });