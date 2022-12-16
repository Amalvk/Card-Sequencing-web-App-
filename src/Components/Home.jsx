import { useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import EditForm from "./EditForm";

export default function Home() {
  const [state, setState] = useState("");
  const [name, setName] = useState([]);
  const [cardIndex, setCardIndex] = useState(1);
  const [editblur, setEditBlur] = useState(true);
  const [editCardData, setEditCardData] = useState([]);

  useEffect(() => {
    rearrange();
  }, [name]);

  const rearrange = () => {
    name.map((val, i) => {
      setCardIndex((val.cardIndex = i + 1), () => {});
    });
  };

  const inputData = (data, val = false, id) => {
    setState(data);
    if (val) {
      setEditBlur(true);
      {
        data && addEditedItem(data, id);
      }
    }
  };

  const addEditedItem = (data, id) => {
    name.forEach((datas) => {
      if (datas.id == id) setCardIndex((datas.value = data));
      return { ...datas };
      setCardIndex((datas.value = data)); // replace the value
      // setName((datas.value = data ))
    });
    setState("");
  };

  const doNothing = () => setEditBlur(true);

  const addItem = () => {
    let a = [];

    name.map((checkDuplicate) => {
      a.push(checkDuplicate.value);
    });

    if (name.length > 0) {
      if (state !== "" && !a.includes(state)) {
        setCardIndex(cardIndex + 1);
        setName([
          ...name,
          { id: Date.now(), value: state, cardIndex: name.length + 1 },
        ]);
      } else {
        alert(`The name ${state} already exist `);
        return "";
      }
    } else {
      if (state !== "") {
        setName([
          ...name,
          { id: Date.now(), value: state, cardIndex: name.length + 1 },
        ]);
      }
    }
  };

  const DeleteItem = (value) => {
    setName(name.filter((item) => item.id !== value.id));
  };

  const SortItem = () => {
    setName([...name.sort((a, b) => (a.cardIndex > b.cardIndex ? 1 : -1))]);
    // setName([...name.sort((a, b) => a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1)])
  };

  const changeIndex = (e, item) => {
    let tempData = name;
    name.map((val) => {
      if (val.cardIndex == e) {
        setCardIndex((val.cardIndex = item.cardIndex));
      }
    });

    //changing current index value with upcomming value
    tempData.forEach((it) => {
      if (it.id == item.id) {
        setCardIndex((it.cardIndex = e));

        // setName(item.cardIndex=e)
      }
    });
    SortItem();
  };

  const editCard = (item) => {
    setEditCardData(item);
    setEditBlur(!editblur);
    // setTimeout(setEditBlur(!editblur), 100)
  };
  return (
    // <div className={ editblur ? "App-blur" : "App" }s tyle={{ marginTop: "2em" }}>
    <div>
      <div
        className={editblur ? "App" : "App-blur"}
        s
        tyle={{ marginTop: "2em" }}
      >
        {
          <Form style={{ width: "50%", margin: "auto" }}>
            <Form.Label> Card Name </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                inputData(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Added data will list and can sort !!
            </Form.Text>
          </Form>
        }
        <div>
          <Button
            disabled={!state}
            onClick={addItem}
            style={{ marginRight: ".2em" }}
          >
            {" "}
            Add{" "}
          </Button>
          <Button
            disabled={!name.length > 0}
            variant="warning"
            onClick={SortItem}
          >
            Sort
          </Button>
        </div>
        <div className="cardhead">
          {name.map((item, index) => {
            return (
              <div className="card">
                <div>{item.value}</div>
                <div className="tail-button">
                  <Form.Control
                    max={name.length}
                    min={1}
                    className="button"
                    type="number"
                    value={item.cardIndex}
                    onChange={(e) => changeIndex(e.target.value, item)}
                  />
                  <Button
                    variant="danger"
                    className="button"
                    onClick={() => DeleteItem(item, index)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="button"
                    onClick={() => {
                      editCard(item);
                    }}
                    variant="success"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {!editblur && (
        <EditForm
          {...[name]}
          inputData={inputData}
          doNothing={doNothing}
          editCardData={editCardData}
          data={3}
        />
      )}
    </div>
  );
}
