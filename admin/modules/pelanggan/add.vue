<template>
	<div class="row">
	  <div class="col-md-12 grid-margin stretch-card">
	    <div class="card">
	      <div class="card-body">
	        <h6 class="card-title">Add Pelanggan</h6>
	        <div id="form-input"></div>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>

module.exports = {
	data() {
		return {
		}
	},
	computed:{
	},
	methods: {
	},
	mounted(){
        var vue = this
        $('#form-input').createForm({
            rest:{
                api: rest["addpelanggan"],
            },
            vue: vue,
            action: 'add',
            back: 'pelanggan',
            form(){
                return [
                    $.inpdate('Tanggal Pendaftaran','tanggalPendaftaran','tanggalPendaftaran',true,{
                    }),
                    $.inptext('Nomor Pendaftaran','nopendaftaran','nopendaftaran',true,{
                        placeholder: 'Nomor Pendaftaran'
                    }),
                    $.inptext('Nomor Seri Barcode','noseribarcode','noseribarcode',true,{
                        placeholder: 'Nomor Seri Barcode'
                    }),
                    $.inpradiobox('Jenis Kelamin','jenisKelamin','jenisKelamin',false,{
                        option: [
                            {
                                name: 'Laki-laki',
                                value: 'L',
                            },
                            {
                                name: 'Perempuan',
                                value: 'P',
                            },
                        ]
                    }),
                    $.inpradiobox('Status Menikah','statusMenikah','jenisKelamin',false,{
                        option: [
                            {
                                name: 'Menikah',
                                value: 'y',
                            },
                            {
                                name: 'Belum Menikah',
                                value: 'n',
                            },
                        ]
                    }),
                    $.inpselect(`Agama`,`agama`,`agama`,true,{
                         placeholder : `Choose Agama`,
                         option: [
                             {value : 'islam', name: 'Islam'},
                             {value : 'kristen', name: 'Kristen'},
                             {value : 'katolik', name: 'Katolik'},
                             {value : 'hindu', name: 'Hindu'},
                             {value : 'budha', name: 'Budha'},
                         ]
                    }),
                    $.inpselect(`Hobi`,`hobi`,`hobi`,false,{
                         placeholder : `Choose Hobi`,
                         option: [
                             {value : 'fashion', name: 'Fashion'},
                             {value : 'travelling', name: 'Travelling'},
                             {value : 'sport', name: 'Sport'},
                             {value : 'kuliner', name: 'Kuliner'},
                             {value : 'membaca', name: 'Membaca'},
                             {value : 'lainnya', name: 'Lainnya'},
                         ]
                    }),
                    $.inptext('Nama Lengkap','fullname','fullname',true,{
                        placeholder: 'Nama Lengkap'
                    }),
                    $.inptext('No. KTP/SIM/Passport/KIMS/KITAS','noktp','noktp',true,{
                        placeholder: 'No. KTP/SIM/Passport/KIMS/KITAS'
                    }),
                    $.inptext('Tempat Lahir','tempatLahir','tempatLahir',true,{
                        placeholder: 'Tempat Lahir'
                    }),
                    $.inpdate('Tanggal Lahir','tanggalLahir','tanggalLahir',true,{
                    }),
                    $.inptextarea('Alamat Tempat Tinggal','tempatTinggal','tempatTinggal',true,{
                        placeholder: 'Alamat Tempat Tinggal'
                    }),
                    $.inptextarea('Kota','kota','kota',true,{
                        placeholder: 'Kota'
                    }),
                    $.inpemail('Alamat E-mail','alamatEmail','alamatEmail',false,{
                        placeholder: 'Alamat E-mail'
                    }),
                    $.inpnumber('No. Telepon','noTelepon','noTelepon',false,{
                        placeholder: 'No. Telepon'
                    }),
                    $.inpnumber('No. Handphone','noHp','noHp',false,{
                        placeholder: 'No. Handphone'
                    }),
                    $.inptext('Facebook','facebook','facebook',false,{
                        placeholder: 'Facebook'
                    }),
                    $.inptext('Twitter','twitter','twitter',false,{
                        placeholder: 'Twitter'
                    }),
                    $.inptext('Instagram','instagram','instagram',false,{
                        placeholder: 'Instagram'
                    }),
                    $.inpselect(`Pendidikan`,`pendidikan`,`pendidikan`,false,{
                         placeholder : `Choose Pendidikan`,
                         option: [
                             {value : 'sma', name: 'SMA'},
                             {value : 'akademi', name: 'Akademi'},
                             {value : 'universitas', name: 'Universitas'},
                             {value : 'lainnya', name: 'Lainnya'},
                         ]
                    }),
                    $.inpselect(`Pekerjaan`,`pekerjaan`,`pekerjaan`,false,{
                         placeholder : `Choose Pekerjaan`,
                         option: [
                             {value : 'bumn', name: 'BUMN'},
                             {value : 'tni', name: 'TNI/Polri'},
                             {value : 'pelajar', name: 'Pelajar/Mahasiswa'},
                             {value : 'pns', name: 'PNS'},
                             {value : 'wiraswasta', name: 'Wiraswasta'},
                             {value : 'lainnya', name: 'Lainnya'},
                         ]
                    }),
                    $.inpselect(`Kunjungan Ke JCM sebulan`,`kunjunganJCM`,`kunjunganJCM`,false,{
                         placeholder : `Kunjungan Ke JCM sebulan`,
                         option: [
                             {value : '1', name: '1x'},
                             {value : '2', name: '2x'},
                             {value : '3', name: '3x'},
                             {value : '4', name: '4x'},
                             {value : '5', name: '5x'},
                         ]
                    }),
                    $.inpselect(`Rata-rata Nominal Belanja di JCM`,`nominalBelanja`,`nominalBelanja`,false,{
                         placeholder : `Rata-rata Nominal Belanja di JCM`,
                         option: [
                             {value : '200', name: 'Rp.200.000 - Rp.500.000'},
                             {value : '500', name: 'Rp.500.000 - Rp.1.000.000'},
                             {value : '1000', name: 'Rp.1.000.000 - Rp.1.500.000'},
                             {value : '1500', name: 'Rp.1.500.000 - Rp.2.000.000'},
                             {value : '2000', name: 'Rp.2.000.000 - Rp.2.500.000'},
                             {value : '2500', name: '> Rp.2.500.000'},
                         ]
                    }),
                ]
            }
        })
	}
};
</script>