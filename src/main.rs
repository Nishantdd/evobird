use lib_neural_network::LayerTopology;
use lib_neural_network::Network;

fn main(){
    let layers: Vec<LayerTopology> = vec![LayerTopology::new(3), LayerTopology::new(2), LayerTopology::new(2)];
    let ffnn = Network::random(&layers);
    ffnn.propagate(vec![3.0,4.0,5.0]);
    println!("{:?}", ffnn);
}