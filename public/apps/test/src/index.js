let {
  Nav,
  Pane,
  PaneGroup,
  NavGroup,
  NavGroupItem,
  NavTitle,
  Table,
  Icon,
  Content,
  ListItem,
  ListGroup
} = polarComponents

class TestApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      apps: [],
      nav: 1,
      wallpapers: ['mxcp89366.png', 'mxcp465753.png', 'mxcp3268386.png', 'mxcp1101098.png']
    }

    Chan.call({
           method: "apps.get",
           params: "",
           success: apps => this.setState({apps: apps})
    });

    Chan.call({
           method: "wallpapers.get",
           params: "",
           success: wallpapers => this.setState({wallpapers: wallpapers})
    });

    Chan.call({
           method: "title.change",
           params: "new title!!!!",
           success: ()=> {}
    });
  }

  onSelectNav(key) {
    this.setState({nav: key})
  }

  render() {// <Table striped header={['ID', 'Name']} rows={this.state.apps} />
    return (
      <Content style={{height: '100%'}}>
          <div className="app-left_panel">
            <Pane sidebar size="sm">
              <NavGroup active Key={this.state.nav} onSelect={this.onSelectNav.bind(this)} >
                <NavTitle>App id: {window.name}</NavTitle>
                <NavGroupItem eventKey={1} glyph="download" text="Apps" />
                <NavGroupItem eventKey={2} glyph="picture" text="Wallpapers" />
              </NavGroup>
            </Pane>
          </div>
          <Pane>
            {(
              this.state.nav != 1 ||
              <Table>
                <thead>
                  <tr>
                    <th style={{width: '10px'}}>ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.apps.map((app)=>{
                      return (<tr>
                        <td>{app.id}</td>
                        <td>{app.name}</td>
                      </tr>)
                    })
                  }
                </tbody>
                </Table>
            )}

            {(
              this.state.nav != 2 ||
                <ListGroup>
                  {this.state.wallpapers.map((img, i)=> {
                    let setWallpaper =  ()=> {
                        Chan.call({
                            method: "wallpaper.change",
                            params: `/static/wallpapers/${img.name}`,
                            success: () => {}
                        });
                    }

                    return (
                      <div key={i} onClick={setWallpaper} >
                        <ListItem
                          image={`/static/wallpapers/${img.name}`}
                          title={img.name}
                          subtitle=""
                           />
                      </div>
                    )
                  })}
                </ListGroup>
            )}

          </Pane>
      </Content>
    )
  }
}

ReactDOM.render(<TestApp name={window.name} />, root);
