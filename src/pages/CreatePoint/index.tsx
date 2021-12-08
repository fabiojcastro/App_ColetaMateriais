import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import './styles.css';
import logo from '../../assets/logo.svg';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import api from '../../services/api';
import axios from "axios";
import {LeafletMouseEvent} from "leaflet";

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUF {
    sigla: string;
}

interface IBGECity {
    nome: string
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUF] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [SelectedCity, setSelectedCity] = useState('0');



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

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }

        axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityName = response.data.map(city => city.nome);

            setCities(cityName);
        })
    }, [selectedUf])

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = (event.target.value);
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = (event.target.value);
        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        console.log(event.latlng)
    };
    
    

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


                    <MapContainer center={[-19.928084, -44.010364]} 
                    zoom={15} 
                    onclick={handleMapClick}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-19.928084, -44.010364]}>
                        </Marker>
                    </MapContainer>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    < option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city"
                                value={SelectedCity}
                                onChange={handleSelectCity}
                                id="city">
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map(city => (
                                    < option key={city} value={city}>{city}</option>
                                ))}
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