import React from 'react';
import MullerLyer from '../components/optical_illusion/MullerLyer';
import Ponzo01 from '../components/optical_illusion/Ponzo01';
import Ponzo02 from '../components/optical_illusion/Ponzo02';
import Diamond from '../components/optical_illusion/Diamond';

export const optical_illusion_set = [
    { name: 'ミュラリー・リヤー錯視', component: (<MullerLyer />) },
    { name: 'ポンゾ錯視①', component: (<Ponzo01 />) },
    { name: 'ポンゾ錯視②', component: (<Ponzo02 />) },
    { name: 'エーレンシュタイン錯視', component: (<MullerLyer />) },
    { name: 'ジャストロー錯視', component: (<MullerLyer />) },
    { name: '正方形・ダイヤモンド形錯視', component: (<Diamond />) },
    { name: 'ポッケンドルフ錯視', component: (<MullerLyer />) },
    { name: 'ツェルナー錯視', component: (<MullerLyer />) },
    { name: 'ヘリング錯視', component: (<MullerLyer />) },
    { name: 'カフェウォール錯視', component: (<MullerLyer />) },
    { name: 'ずれたグラデーションの錯視', component: (<MullerLyer />) },
    { name: 'フレーザー錯視', component: (<MullerLyer />) },
];
