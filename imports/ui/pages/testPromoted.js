import React from 'react';
import FontAwesome from 'react-fontawesome';

export class testPromoted extends React.Component {
    render () {
        return (
            
                                <div className="grid-item-double reglageCarteDouble">
                        <img src="assets/placeholder.png" className="reglageImageCarteDouble" />
                    <div className="texteCarteDouble">
                       <h1 className="headerCarte" >2 février</h1>
                       <div className="corpsCarte" >
                       <h3>Ahoy !</h3>
                       </div>
                       <div className="icones piedsCarte">
                            <FontAwesome className="couleurAtelier" name="check-circle" size="2x"/>{' '}
                            <FontAwesome className="couleurAtelier" name="comments" size="2x"/>{' '}
                            <FontAwesome className="couleurAtelier" name="arrow-circle-up" size="2x"/>
                            </div>
                    </div>
                    </div>
            
            )
    }
}