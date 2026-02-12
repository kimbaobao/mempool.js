import mempoolJS from "./../../../src/index";

const init = async () => {
  try {
    const {
      bitcoin: { websocket },
    } = mempoolJS();
    
    const ws = websocket.wsInit();

    ws.addEventListener('message', function incoming({data}) {
      console.log(JSON.parse(data.toString()));
    });

    websocket.wsWantData(ws, ['blocks', 'stats', 'mempool-blocks', 'live-2h-chart']);

    websocket.wsTrackAddress(ws, "1Myy4QCu9zWESRHrVZBusN6g9bS5G7L5UK");

    websocket.wsTrackAddresses(ws, [
      "1Myy4QCu9zWESRHrVZBusN6g9bS5G7L5UK",
    ]);

    websocket.wsTrackTransaction(ws, "ffe542ba33388612c72137bd158983de2eabb19cfa8fba76bfe7a3f6520e7f6b");

    websocket.wsTrackRbfSummary(ws);

    websocket.wsTrackRbf(ws, true);

    websocket.wsTrackMempoolBlock(ws, 1);

    setTimeout(() => {
      websocket.wsStopData(ws);
      websocket.wsStopTrackingAddress(ws);
      websocket.wsStopTrackingAddresses(ws);
      websocket.wsStopTrackingTransaction(ws);
      websocket.wsStopTrackingRbfSummary(ws);
      websocket.wsStopTrackingRbf(ws);
      websocket.wsStopTrackingMempoolBlock(ws);
    }, 60000);

  } catch (error) {
    console.log(error);
  }
}
init();
