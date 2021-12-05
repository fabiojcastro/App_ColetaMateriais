import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import './styles.css';
import logo from '../../assets/logo.svg';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import api from '../../services/api';
import axios from "axios";

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUF {
    sigla: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUF] = useState<string[]>([]);


    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get<IBGEUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitial = response.data.map(uf => uf.sigla);

            setUF(ufInitial);
        })
    }, [])

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br></br>ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="Whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="Whatsapp"
                                id="Whatsapp"
                            />
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>


                    <MapContainer center={[-19.928084, -44.010364]} zoom={15} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-19.928084, -44.010364]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf =>(
                                    < option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="city">Cidade</label>
                        <select name="city" id="city">
                            <option value="0">Selecione uma Cidade</option>
                        </select>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>
                    <h2>Itens de coleta</h2>
                    <span>Selecione um ou mais itens abaixo</span>
                </legend>
                <ul className="items-grid">
                    {items.map(item => (
                        <li key={item.id}>
                            <img src={item.image_url} alt={item.title} />
                            <span>{item.title}</span>
                        </li>
                    ))}

                </ul>
            </fieldset>

            <button type="submit">
                Cadastrar ponto de coleta
            </button>

        </form>
        </div >
    )
};
export default CreatePoint;