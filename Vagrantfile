Vagrant.configure("2") do |config|

    config.vm.box = "MsEdgeWin10preview"

    # config.vm.box = "file:///linux/path/to/box/file/vagrant-windows-edge.box"

    # config.ssh.insert_key = false

    # config.vm.network "public_network"

    config.vm.provider "virtualbox" do |vb|
        vb.memory = "2524"
        vb.gui = true
        vb.name = "vagrant-windows-edge-refactor"
        vb.customize ["modifyvm", :id, "--vram", "128"]
    end
end